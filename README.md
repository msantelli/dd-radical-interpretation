# Radical Interpreter

![Status](https://img.shields.io/badge/Status-Educational_Beta-emerald)
![Philosophy](https://img.shields.io/badge/Philosophy-Donald_Davidson-amber)
![License](https://img.shields.io/badge/License-MIT-blue)

**Radical Interpreter** is an interactive educational tool that gamifies the philosophical concept of *Radical Interpretation* as developed by Donald Davidson (and W.V.O. Quine).

You play as a field linguist attempting to decipher an alien language from scratch. You have no dictionary, only observable behavior. Your goal is to build a **T-Theory** (Truth Theory) that explains the alien's utterances.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/radical-interpreter)

---

## 🧠 The Philosophy Behind the Game

This application serves as a practical demonstration of Davidson's answer to the question: *"What is it for words to mean what they do?"*

### 1. Meaning is Public (The Black Box)
We cannot look inside the alien's head. Meaning must be derived entirely from **publicly observable behavior** and the environment.

### 2. The T-Schema
Davidson (adapting Tarski) argued that to know the meaning of a sentence is to know its truth conditions.
> *s* is True if and only if *p*.
> "Gavagai" is true iff there is a rabbit present.

### 3. The Principle of Charity
To get started, you must assume the alien is **rational** and mostly **correct** about the world. If your translation makes the alien believe it is raining when it is sunny, your translation is likely wrong, not the alien.

### 4. Triangulation
Meaning is anchored by a triangle of:
1.  **The Speaker** (Subject)
2.  **The Interpreter** (You)
3.  **The Shared World** (Objects you both see)

---

## 🏗️ Hybrid Architecture

To function as a sustainable, zero-cost Open Educational Resource (OER), this app uses a hybrid evaluation system:

### 🟢 Static Mode (Default / Zero Cost)
*   **How it works:** Runs entirely in the browser using pre-defined scenarios (e.g., the classic "Gavagai" thought experiment).
*   **Evaluation:** A local deterministic algorithm checks your T-Sentences against hidden "solution keywords" embedded in the scenario data.
*   **Cost:** $0. No API keys required.

### 🟣 Infinite Mode (Optional)
*   **How it works:** Uses **Google Gemini 2.5 Flash** to generate infinite unique alien languages and scenarios.
*   **Evaluation:** The LLM acts as a "Logic Professor," analyzing the semantic validity of your definitions dynamically.
*   **Setup:** Requires a `.env` file with a valid `API_KEY`.

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/radical-interpreter.git
    cd radical-interpreter
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run locally**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

### Deployment (Netlify)

This project is configured for instant deployment on Netlify.

1.  Fork this repository.
2.  Log in to Netlify and "Import from Git".
3.  The `netlify.toml` file will automatically configure the build settings:
    *   **Build Command:** `npm run build`
    *   **Publish Directory:** `dist`

---

## 📝 Abridged Changelog

*   **Hybrid Evaluation System:** Implemented dual-mode evaluation (Deterministic keyword matching vs AI-based) for zero-cost deployment.
*   **Curriculum Expansion:** Added progressive levels introducing Reference (Level 1), Compositionality (Level 2), Negation (Level 3), and Quantification (Level 4).
*   **Bilingual Support:** Full localization for English and Spanish (Español), including a randomized language selection screen.
*   **Philosophical Accuracy:**
    *   Refocused inputs from "Reference Axioms" to "T-Sentences" for whole utterances.
    *   Implemented the Triangulation visualization.
    *   Clarified the T-Schema relative to the "Language of the Subject".
*   **Meta-Analysis Module:** Added a "Final Field Report" that compiles the user's T-Theory and offers a meta-linguistic reflection on the distinction between Object Language and Metalanguage.
*   **UI/UX:** Created an immersive "terminal-style" interface with a dedicated Field Manual and About section.

---

## 📚 Educational References

*   **Donald Davidson**, *Inquiries into Truth and Interpretation* (1984) - specifically the essay "Radical Interpretation".
*   **W.V.O. Quine**, *Word and Object* (1960) - for the "Gavagai" thought experiment.
*   **Kathrin Glüer**, *Donald Davidson: A Short Introduction*.

---

## 🛠️ Tech Stack

*   **Framework:** React 19 + TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **AI Integration:** Google GenAI SDK (Gemini 2.5 Flash)

---

*Built for the love of logic.*