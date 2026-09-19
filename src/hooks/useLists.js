import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import {
  createList,
  deleteList,
  getListById,
  getListsByUser,
  updateList,
} from "../services/listService";

export function useLists() {
  const { user } = useAuth();
  const [lists, setLists] = useState([]);

  const refresh = useCallback(() => {
    setLists(user ? getListsByUser(user.id) : []);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  function addList({ name, description, gameIds }) {
    if (!user) return null;
    const created = createList({ name, description, gameIds, userId: user.id });
    refresh();
    return created;
  }

  function editList(listId, { name, description, gameIds }) {
    if (!user) return null;
    const updated = updateList(listId, user.id, { name, description, gameIds });
    refresh();
    return updated;
  }

  function removeList(listId) {
    if (!user) return;
    deleteList(listId, user.id);
    refresh();
  }

  function findList(listId) {
    return user ? getListById(listId, user.id) : null;
  }

  return { lists, addList, editList, removeList, findList, refresh };
}
