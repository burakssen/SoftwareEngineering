# Training Platform
## Purpose of the Project
This project is developed for the BLG411E - Software Engineering course given in Fall'21.

Instructor: Ayşe Tosun

Teaching Assistant: İlknur Çelik

Group Members:
- Başar Demir
- Burak Şen
- Emine Darı
- Zafer Yıldız

## About the Project
### Motivation
Training platforms present resources for employees in various areas and they are widely used by large number of people nowadays. However, existing platforms provides a training environment only for individual users. In this project, we aim to construct more advanced platform which has a employee-company relationship where companies can track performances of their employees. Employees can enroll different training contents after they get the approval for the corresponding training from their managers. On the other hand, managers within the body of the company can evaluate approval requests or assign new trainings to employees. Platform also can produce reports about the performance of employees on completing trainings and it can send essential notification to corresponding users.

### Installation

After cloning the repository, use the Node Package Manager to install required modules both for client and server.

```bash
npm install
```
To run the application, first run each microservice and the API gateway by the following command. Then run the client program by the same command to access the platform via a browser.

```bash
npm start
```

Do not forget to implement necessary configurations for the database connection, as the keys and configurationn flies are not shared in this repository.