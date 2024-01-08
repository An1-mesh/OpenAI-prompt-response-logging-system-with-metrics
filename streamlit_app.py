import streamlit as st
import requests

# Define the OpenAI models
openai_models = [
    'gpt-3.5-turbo',
    'gpt-3.5-turbo-1106',
    'gpt-3.5-turbo-instruct',
    'gpt-4',
]

# First Tab - Send Queries to OpenAI
st.markdown("# OpenAI Query Tab")

# User input boxes
prompt = st.text_input("Enter Prompt:")
model = st.selectbox("Select Model:", openai_models)
environment = st.selectbox("Select Environment:", ["Production", "Development"])
user = st.text_input("Enter User:")

# Log Query Button
log_query_button = st.button("Send Query")

# Function to log query
def log_query():
    query_payload = {
        'prompt': prompt,        
        'metadata': {
            'user': user,
            'environment': environment,
            'model': model,
        }
    }

    # response = requests.post('YOUR_NESTJS_BACKEND_API_ENDPOINT', json=query_payload)
    # Note: Replace 'YOUR_NESTJS_BACKEND_API_ENDPOINT' with the actual endpoint of your NestJS backend.
    response = requests.post('http://localhost:3000/query', json=query_payload)


    if response.status_code in {200, 201}:
        st.success("Query successfully logged to the database")
    else:
        st.error(f"Error logging query: {response.text if hasattr(response, 'text') else 'Unknown error'}")


# Trigger log query function when button is clicked
if log_query_button:
    log_query()

# Second Tab - Dashboard
st.markdown("# Dashboard Tab")
# Add your code for displaying ClickHouse data and other metrics here
