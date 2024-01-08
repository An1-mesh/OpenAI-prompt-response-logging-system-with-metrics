import streamlit as st
import requests

# Define the OpenAI models
openai_models = [
    'gpt-3.5-turbo',
    'gpt-3.5-turbo-1106',
    'gpt-3.5-turbo-instruct',
    'babbage-002',
    'davinci-002',
]

# First Tab - Send Queries to OpenAI
st.markdown("# OpenAI Query Tab")

# User input boxes
prompt = st.text_input("Enter Prompt:")
model = st.selectbox("Select Model:", openai_models)
environment = st.selectbox("Select Environment:", ["Production", "Development"])
user = st.text_input("Enter User:")

# Log Data Button
log_query_button = st.button("Send Query")

# Function to log data
def log_query():
    data_payload = {
        'prompt': prompt,        
        'metadata': {
            'user': user,
            'environment': environment,
            'model': model,
        }
    }

    # response = requests.post('YOUR_NESTJS_BACKEND_API_ENDPOINT', json=data_payload)
    # Note: Replace 'YOUR_NESTJS_BACKEND_API_ENDPOINT' with the actual endpoint of your NestJS backend.
    response = requests.post('http://localhost:3000/query', json=data_payload)


    if response.status_code in {200, 201}:
        st.success("Data successfully logged to the database")
    else:
        st.error(f"Error logging data: {response.text if hasattr(response, 'text') else 'Unknown error'}")


# Trigger log data function when button is clicked
if log_query_button:
    log_query()

# Second Tab - Dashboard
st.markdown("# Dashboard Tab")
# Add your code for displaying ClickHouse data and other metrics here
