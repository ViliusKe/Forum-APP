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
  answerId: string;
};

export const deleteAnswerById = async ({
  answerId,
  jwt,
}: AnswerHeadersAndIdProps) => {
  try {
    const response = await axios.delete(
      `${config.BASE_URL}/posts/answers/${answerId}`,
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

export const likeAnswerById = async ({
  answerId,
  jwt,
}: AnswerHeadersAndIdProps) => {
  try {
    const response = await axios.put(
      `${config.BASE_URL}/answers/${answerId}/like`,
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
  answerId,
  jwt,
}: AnswerHeadersAndIdProps) => {
  try {
    const response = await axios.put(
      `${config.BASE_URL}/answers/${answerId}/dislike`,
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
