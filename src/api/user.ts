import api from '@/lib/axios';
import { auth } from '@/lib/firebase';
import {
  API_PATH_CREATE_USER,
  API_PATH_GET_IS_PROFILE_OWNER,
  API_PATH_GET_PROFILE,
  API_PATH_GET_USER,
  API_PATH_GET_USER_DESTINATIONS,
  API_PATH_GET_USER_PROFILE_LINK,
  API_PATH_UPDATE_PROFILE_PICTURE,
  API_PATH_UPDATE_USER,
  API_PATH_UPDATE_USER_COLORS,
  API_PATH_UPDATE_VISITED_DESTINATIONS,
} from '@/res/values';
import User from '@/types/User';

export const createUser = async (
  mail: string,
  firstName: string,
  lastName: string,
  visitedDestinations?: string[],
) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const idUser = auth.currentUser?.uid;

    if (!visitedDestinations) visitedDestinations = [];

    if (token && idUser) {
      const { data } = await api.post(
        API_PATH_CREATE_USER,
        { idUser, mail, firstName, lastName, visitedDestinations },
        {
          params: {
            token,
          },
        },
      );
      return data;
    }
    return;
  } catch (e) {
    return;
  }
};

export const updateVisitedDestinations = async (
  visitedDestinations: string[],
) => {
  try {
    const token = await auth.currentUser?.getIdToken();

    if (token) {
      const { data } = await api.post(
        API_PATH_UPDATE_VISITED_DESTINATIONS,
        { visitedDestinations },
        {
          params: {
            token,
          },
        },
      );
      return data;
    }
    return;
  } catch (e) {
    return;
  }
};

export const updateUserColors = async (
  visitedColor1: string,
  visitedColor2: string,
  visitedColor3: string,
  notVisitedColor1: string,
  notVisitedColor2: string,
  notVisitedColor3: string,
  colorBorders: string,
) => {
  try {
    const token = await auth.currentUser?.getIdToken();

    if (token) {
      const { data } = await api.post(
        API_PATH_UPDATE_USER_COLORS,
        {
          visitedColor1,
          visitedColor2,
          visitedColor3,
          notVisitedColor1,
          notVisitedColor2,
          notVisitedColor3,
          colorBorders,
        },
        {
          params: {
            token,
          },
        },
      );
      return data;
    }
    return;
  } catch (e) {
    return;
  }
};

export const updateProfilePicture = async (profilePicture: Blob) => {
  try {
    const token = await auth.currentUser?.getIdToken();

    const formData = new FormData();
    formData.append('profilePicture', profilePicture);

    if (token) {
      const { data } = await api.post(
        API_PATH_UPDATE_PROFILE_PICTURE,
        formData,
        {
          params: {
            token,
          },
        },
      );
      return data;
    }
    return;
  } catch (e) {
    return;
  }
};

export const updateUser = async (user: User) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    user.idUser = auth.currentUser?.uid || '';

    if (token) {
      const { data } = await api.post(API_PATH_UPDATE_USER, user, {
        params: {
          token,
        },
      });
      return data;
    }
    return;
  } catch (e) {
    return;
  }
};

export const getUser = async () => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const ownerId = auth.currentUser?.uid;

    if (token && ownerId) {
      const { data } = await api.get(`${API_PATH_GET_USER}/${ownerId}`, {
        params: {
          token,
        },
      });
      return data;
    }
    return;
  } catch (e) {
    return;
  }
};

export const getUserDestinations = async () => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const ownerId = auth.currentUser?.uid;

    if (token && ownerId) {
      const { data } = await api.get(
        `${API_PATH_GET_USER_DESTINATIONS}/${ownerId}`,
        {
          params: {
            token,
          },
        },
      );
      return data;
    }
    return;
  } catch (e) {
    return;
  }
};

export const getUserProfileLink = async () => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const ownerId = auth.currentUser?.uid;

    if (token && ownerId) {
      const { data } = await api.get(
        `${API_PATH_GET_USER_PROFILE_LINK}/${ownerId}`,
        {
          params: {
            token,
          },
        },
      );
      return data;
    }
    return;
  } catch (e) {
    return;
  }
};

export const getProfile = async (customLink: string, token: string) => {
  try {
    if (customLink) {
      const { data } = await api.get(`${API_PATH_GET_PROFILE}/${customLink}`, {
        params: {
          token,
        },
      });
      return data;
    }
    return;
  } catch (e) {
    return;
  }
};

export const getIsProfileOwner = async (customLink: string, token: string) => {
  try {
    if (customLink) {
      const { data } = await api.get(
        `${API_PATH_GET_IS_PROFILE_OWNER}/${customLink}`,
        {
          params: {
            token,
          },
        },
      );
      return data;
    }
    return;
  } catch (e) {
    return;
  }
};
