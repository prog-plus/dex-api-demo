import Client from '../models/client.js';

export default async function getClientById(user_id) {
  return Client.findByPk(user_id);
}
