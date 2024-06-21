import json
import boto3
import base64
import logging
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders
from request_handler import handle_post_request

logger = logging.getLogger()
logger.setLevel(logging.INFO)

ses_client = boto3.client("ses", region_name="eu-central-1")


def lambda_handler(event, context):
    logger.info("Event: %s", event)
    method = event["requestContext"]["http"]["method"]

    if method == "OPTIONS":
        logger.info("Handling OPTIONS request")
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        }

    if method != "POST":
        logger.warning("Method Not Allowed: %s", method)
        return {
            "statusCode": 405,
            "body": json.dumps({"message": "Method Not Allowed"}),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        }

    body_str = event.get("body", "")
    body_json = json.loads(body_str)
    download_type = body_json.get("downloadType", "")
    email = body_json.get("email", "")

    logger.info("Download type: %s, Email: %s", download_type, email)

    response = handle_post_request(body_str, download_type)

    if email:
        logger.info("Sending file via SES to %s", email)
        if send_file_via_ses(response, email, download_type):
            logger.info("File sent successfully to %s", email)
            return {
                "statusCode": 200,
                "body": json.dumps({"message": "File sent to email"}),
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                },
            }
        else:
            logger.error("Failed to send file to %s", email)
            return {
                "statusCode": 500,
                "body": json.dumps({"message": "Failed to send email"}),
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                },
            }

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if "headers" not in response:
        response["headers"] = {}

    response["headers"].update(cors_headers)

    return response


def send_file_via_ses(response, email, download_type):
    try:
        file_content = json.loads(response["body"])["fileContent"]
        file_extension = download_type.lower()
        file_name = f"report.{file_extension}"

        if file_extension in ["csv", "xlsx"]:
            file_content = base64.b64decode(file_content)

        msg = MIMEMultipart("mixed")
        msg["Subject"] = "Your Gulo Report is Ready! 📊✨"
        msg["From"] = "reports@guloapp.com"
        msg["To"] = email

        msg_body = MIMEMultipart("alternative")

        text_content = f"""
        Hello 👋,

        We have generated the {download_type} Report you requested. 📈
        Please find the attached file. 📎

        Thank you for using Gulo! 🙏

        Best regards,
        The Gulo Team
        """

        html_content = f"""
        <html>
        <body>
            <p>Hello 👋,</p>
            <p>We have generated the <strong>{download_type}</strong> Report you requested. 📈</p>
            <p>Please find the attached file. 📎</p>
            <p>Thank you for using Gulo! 🙏</p>
            <p>Best regards,<br>The Gulo Team</p>
        </body>
        </html>
        """

        textpart = MIMEText(text_content, "plain")
        htmlpart = MIMEText(html_content, "html")

        msg_body.attach(textpart)
        msg_body.attach(htmlpart)

        att = MIMEBase("application", "octet-stream")
        att.set_payload(file_content)
        encoders.encode_base64(att)
        att.add_header("Content-Disposition", f"attachment; filename={file_name}")

        msg.attach(msg_body)
        msg.attach(att)

        response = ses_client.send_raw_email(
            Source="reports@guloapp.com",
            Destinations=[email],
            RawMessage={
                "Data": msg.as_string(),
            },
        )
        return True
    except Exception as e:
        logger.error("Error sending file via SES: %s", e)
        return False
