const Database = require("./database/db");
const saveOrphanage = require("./database/saveOrphanage");

module.exports = {
  index(req, res) {
    return res.render("index");
  },

  async orphanage(req, res) {
    try {
      const id = req.query.id;
      const db = await Database;
      const result = await db.all(`SELECT * FROM orphanages WHERE id="${id}"`);
      orphanage = result[0];
      orphanage.images = orphanage.images.split(",");
      orphanage.firstImage = orphanage.images[0];
      orphanage.open_on_weekends =
        orphanage.open_on_weekends === "0" ? false : true;
      return res.render("orphanage", { orphanage });
    } catch (erro) {
      return res.send("Erro no banco de dados");
    }
  },

  async orphanages(req, res) {
    try {
      const db = await Database;
      const orphanages = await db.all("SELECT * FROM orphanages");
      return res.render("orphanages", { orphanages });
    } catch (error) {
      console.log(error);
      return res.send("Erro no banco de dados");
    }
  },

  createOrphanages(req, res) {
    return res.render("create-orphanage");
  },

  async saveOrphanage(req, res) {
    const fields = req.body;

    try {
      const db = await Database;
      await saveOrphanage(db, {
        lat: fields.lat,
        lng: fields.lng,
        name: fields.name,
        about: fields.about,
        whatsapp: fields.whatsapp,
        images: fields.images.toString(),
        instructions: fields.instructions,
        opening_hours: fields.opening_hours,
        open_on_weekends: fields.open_on_weekends,
      });

      return res.redirect("orphanages");
    } catch (error) {
      console.log(error);
      return res.send("Aconteceu um erro no nosso sistema");
    }
  },
};
