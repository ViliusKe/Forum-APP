import axios from "axios";
import { config } from "../config";

type FetchPostsProps = {
  filter?: string;
};

export const fetchAllPosts = async ({ filter = "" }: FetchPostsProps) => {
  try {
    const response = await axios.get(
      `${config.BASE_URL}/posts${filter ? `?filter=${filter}` : ""}`
    );

    return response;
  } catch (err) {
    throw err;
  }
};

type InsertPostProps = {
  jwt: string;
  insertBody: object;
};

export const insertPost = async ({ jwt, insertBody }: InsertPostProps) => {
  try {
    const response = await axios.post(`${config.BASE_URL}/posts`, insertBody, {
      headers: {
        Authorization: jwt,
      },
    });

    return response;
  } catch (err) {
    throw err;
  }
};

type FetchPostByIdProps = {
  id: string;
};

export const fetchPostById = async ({ id }: FetchPostByIdProps) => {
  try {
    const response = await axios.get(`${config.BASE_URL}/posts/${id}`);

    return response;
  } catch (err) {
    throw err;
  }
};

type DeletePostByIdProps = { id: string; jwt: string };

export const DeletePostById = async ({ id, jwt }: DeletePostByIdProps) => {
  try {
    const response = await axios.delete(`${config.BASE_URL}/posts/${id}`, {
      headers: {
        Authorization: jwt,
      },
    });

    return response;
  } catch (err) {
    throw err;
  }
};
