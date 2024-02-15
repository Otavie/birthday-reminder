# Birthday Reminder App

As our business expands, manually tracking and sending well wishes to customers on their birthdays has become inefficient. To streamline this process, we aim to develop a Birthday Reminder App that automates the task of collecting customer information, checking for birthdays, and sending personalized emails.

## Project Overview

The Birthday Reminder App will consist of the following components:

1. **User Interface**: A simple UI interface will be created to collect customers' date of birth, username, and email. This interface will provide a seamless experience for entering and managing customer data.

2. **Automated Birthday Check**: A cron job will be scheduled to run every day at 7am. This job will query the database to identify customers whose birthdays match the current date.

3. **Email Automation**: Using nodemailer, emails will be sent to birthday celebrants with personalized well wishes. The email content will be customizable, allowing for personalized messages to be sent to each customer.

## Getting Started

To set up the Birthday Reminder App locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies using `npm install`.
3. Set up a MongoDB database to store customer information.
4. Configure the environment variables for database connection and email platform credentials.
5. Run the application using `npm start:backend`.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Email Platform**: Gmail
- **Additional Packages**: cron, nodemailer

## Usage

1. Navigate to the UI interface and input customer details including date of birth, username, and email.
2. Ensure that the cron job is configured to run daily at 7am to check for upcoming birthdays.
3. Once the cron job identifies birthday celebrants, personalized emails will be automatically sent to them using the specified email platform.

## Contributing

Contributions to the Birthday Reminder App are welcome! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to [nodemailer](https://nodemailer.com/) for providing an easy-to-use email automation solution.
- Special thanks to the team for their hard work and dedication in developing the Birthday Reminder App.

## Contact

For any inquiries or support, please contact [otavieokuoyo@gmail.com](mailto:otavieokuoyo@gmail.com). We'd love to hear from you!
