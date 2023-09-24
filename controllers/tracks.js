const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

/*
    Obtener lista de la bd 
 */
const getItems = async (req, res) => {
  try {
    const user = req.user
    const data = await tracksModel.findAllData({});
    res.send({ data ,user });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

/* 
    Obtener un registro 
*/
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await tracksModel.findOneData(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

/*
Insertar un registro
 */
const createItem = async (req, res) => {
  try {
    const body = matchedData(req); // con esta funcion matchedData te aseguras que la data esta limpia , y no te puedan annadir mas campos al BD
    const data = await tracksModel.create(body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

/* 
    Actualizar un registro
*/
const updateItem = async (req, res) => {;
try {
    const {id,...body} = matchedData(req);
    const data = await tracksModel.findByIdAndUpdate(id,body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_ITEMS");
  }
}
/* 
    Eliminar un registro
*/
const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await tracksModel.delete({_id:id});
        res.send({ data });
      } catch (error) {
        handleHttpError(res, "ERROR_DELETE_ITEM");
      }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
