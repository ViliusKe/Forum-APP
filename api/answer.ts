import axios from "axios";
import { config } from "../config";

type InsertAnswerProps = {
  jwt: string;
  id: string;
  insertBody: object;
};

export const createAnswer = async ({
  jwt,
  id,
  insertBody,
}: InsertAnswerProps) => {
  try {
    const response = await axios.post(
      `${config.BASE_URL}/posts/${id}/answer`,
      insertBody,
      {
        headers: {
          Authorization: jwt,
        },
      }
    );

    return response;
  } catch (err) {
    throw err;
  }
};

type AnswerHeadersAndIdProps = {
  jwt: string;
  id: string;
};

export const deleteAnswerById = async ({
  id,
  jwt,
}: AnswerHeadersAndIdProps) => {
  try {
    const response = await axios.delete(`${config.BASE_URL}/answers/${id}`, {
      headers: {
        Authorization: jwt,
      },
    });

    return response;
  } catch (err) {
    throw err;
  }
};

export const likeAnswerById = async ({ id, jwt }: AnswerHeadersAndIdProps) => {
  try {
    const response = await axios.put(
      `${config.BASE_URL}/answers/${id}/like`,
      {},
      {
        headers: {
          Authorization: jwt,
        },
      }
    );

    return response;
  } catch (err) {
    throw err;
  }
};

export const dislikeAnswerById = async ({
  id,
  jwt,
}: AnswerHeadersAndIdProps) => {
  try {
    const response = await axios.put(
      `${config.BASE_URL}/answers/${id}/dislike`,
      {},
      {
        headers: {
          Authorization: jwt,
        },
      }
    );

    return response;
  } catch (err) {
    throw err;
  }
};
