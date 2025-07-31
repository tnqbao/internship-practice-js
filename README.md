# 🧾 BMI Calculator – Frontend Practice Project

A responsive BMI Calculator built with **vanilla JavaScript**, following the **MVC pattern** and using the **Strategy pattern** to handle Metric and Imperial conversions.

---

## Get Started

### 1. Install dependencies

Open a terminal in Codespace and run:

```bash
yarn install
# or
npm install
```

---

### 2. Start the dev server

```bash
yarn dev
# or
npm run dev
```

Parcel will serve the app at:

```http request
http://localhost:1234
```

---

## Run Production Build with Docker

### 1. Build image

```bash
docker build -t agility-practice-js .
```

### 2. Run container

```bash
docker run -p 8080:80 agility-practice-js
```

Then open `localhost:8080` (or expose port 8080 in localhost).

---

## Tech Stack

* JavaScript (Vanilla)
* Parcel bundler
* Docker (multi-stage)
* ESLint
* GitHub Codespaces compatible
* Patterns: MVC + Strategy

---

## Project Structure

```
bmi-calculator/
├── package.json
├── Dockerfile
├── .dockerignore
├── eslint.config.mjs
├── src/
│   ├── index.html
│   ├── style.css
│   ├── main.js
│   ├── models/
│   ├── views/
│   ├── controllers/
│   ├── strategies/
│   ├── config/
│   └── utils/
└── test/
```

---

## Deployment Link:
[https://practice-js.daudoo.com/](https://practice-js.daudoo.com/)

---
## Contact


If you have any questions or suggestions, feel free to reach out:

* Github: [tnqbao](https://github.com/tnqbao)
* Email: [quocbao.job106204@gmail.com](mailto:quocbao.job106204@gmail.com)
