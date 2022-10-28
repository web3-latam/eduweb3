import { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.CONVERTKIT_API_KEY;
const BASE_URL = "https://api.convertkit.com/v3";

function subscribeToForm(params) {
  const url = [BASE_URL, `forms`, params.formId, "subscribe"].join("/");

  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
  });

  return fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      api_key: API_KEY,
      email: params.email,
    }),
  });
}

async function subscribeToFormHandler(req, res) {
  const body = req.body;

  // best to validate this with Zod...

  await subscribeToForm({
    formId: body.formId,
    email: body.email,
  });

  return res.send({ success: true });
}

export default subscribeToFormHandler;
