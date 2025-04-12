# MovieRater_Capstone2
The project is creating a website that lets users rate movies using React.

## Overview

This branch enhances the movie review application by introducing a new review process. Instead of simply assigning a score to a movie, users can now write a full review. The application then runs the review through a sentiment analysis engine, which automatically computes a score based on the tone and content of the review. This feature is especially useful for users who are unsure about assigning a score directly—they can just share their thoughts and let the system assign a rating.

Checkpoint files for the sentiment analysis model can be found [here](https://huggingface.co/spaces/spava001/Sentiment-Analysis/tree/main). Once downloaded, place the contents of the checkpoint folder inside your local project at sentiment_analysis/checkpoint/ (you need to create the checkpoint folder).

The final structure should look like this:
Movie-Rater/<br>
└── sentiment_analysis/<br>
    └── checkpoint/<br>
        └── checkpoint files go here<br>

## Setup Instructions

### 1. Create a Virtual Environment

It is recommended to create a virtual environment to isolate this project's dependencies.

**Create the virtual environment:**

```bash
python -m venv venv
```

Activate the virtual environment:

Windows:

```bash
venv\Scripts\activate
```

Mac/Linux:

```bash
source venv/bin/activate
```

### 2. Install the Required Packages
Once your virtual environment is activated, install the project dependencies using:

```bash
pip install -r requirements.txt
```

### 3. Running the Application
This version includes both a React front-end and a Flask backend server. To launch the complete application, use the following command:

```bash
npm run dev-all
```
This command concurrently runs the React application and the Flask server.

If you ever need to run only the front-end, you can still use:

```bash
npm run dev
```