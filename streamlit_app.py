import streamlit as st
import requests
import pandas as pd
from datetime import datetime

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

# Log Query Button
log_query_button = st.button("Send Query", key="log_query_button")

# Function to log query
def log_query():
    query_payload = {
        'prompt': prompt,
        'model': model,
    }

    response = requests.post('http://localhost:3000/query', json=query_payload)

    if response.status_code in {200, 201}:
        st.success("Query successfully logged to the database")
        # Output textbox for OpenAI response
        with st.expander("OpenAI Response", expanded=True):
            output_textbox = st.text_area(label=" ", value=response.text, height=300, key="output_textbox")
    else:
        st.error(f"Error logging query: {response.text if hasattr(response, 'text') else 'Unknown error'}")

# Trigger log query function when button is clicked
if log_query_button:
    log_query()

# Second Tab - Dashboard
st.markdown("# Dashboard Tab")

# Expander for Query Timestamp filter
with st.sidebar.expander("Query Timestamp", expanded=False):
    # Date and Time Input for filtering
    start_date = st.date_input("Start Date", key="start_date")
    start_time = st.time_input("Start Time", key="start_time")
    start_datetime = datetime.combine(start_date, start_time)

    end_date = st.date_input("End Date", key="end_date")
    end_time = st.time_input("End Time", key="end_time")
    end_datetime = datetime.combine(end_date, end_time)

    # Button to Trigger Query with Filter
    filter_data_button = st.button("Filter Data", key="filter_data_button")

# Expander for Number of Tokens filter
with st.sidebar.expander("Number of Tokens", expanded=False):
    min_tokens = st.number_input("Min Tokens", value=0, key="min_tokens")
    max_tokens = st.number_input("Max Tokens", value=100, key="max_tokens")

    # Button to Trigger Query with Token Filter
    filter_tokens_button = st.button("Filter Data by Tokens", key="filter_tokens_button")

# Function to fetch filtered data by timestamp
def filter_data_by_timestamp():
    formatted_start_date = start_datetime.isoformat()
    formatted_end_date = end_datetime.isoformat()

    # Send the request with Luxon DateTime objects
    response = requests.get(
        'http://localhost:3000/filterData',
        params={
            'startDate': formatted_start_date,
            'endDate': formatted_end_date,
        }
    )

    if response.status_code == 200:
        filtered_data = response.json()
        st.table(pd.DataFrame(filtered_data))
    else:
        st.error(f"Error fetching filtered data by timestamp in Streamlit application: {response.text if hasattr(response, 'text') else 'Unknown error'}")

# Function to fetch filtered data by tokens
def filter_data_by_tokens():
    # Send the request with min and max token values
    response = requests.get(
        'http://localhost:3000/filterDataByTokens',
        params={
            'minTokens': min_tokens,
            'maxTokens': max_tokens,
        }
    )

    if response.status_code == 200:
        filtered_data = response.json()
        st.table(pd.DataFrame(filtered_data))
    else:
        st.error(f"Error fetching filtered data by tokens in Streamlit application: {response.text if hasattr(response, 'text') else 'Unknown error'}")

# Trigger filter data function when button is clicked for timestamp
if filter_data_button:
    filter_data_by_timestamp()

# Trigger filter data function when button is clicked for tokens
if filter_tokens_button:
    filter_data_by_tokens()
