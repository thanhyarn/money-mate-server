const Vocabulary = require("../models/Vocabulary");

class VocabulariesController {
  // GET /get-vocabularies
  async getAllVocabularies(req, res) {
    try {
      const vocabularies = await Vocabulary.find();
      res.status(200).json(vocabularies);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching vocabularies", error: err.message });
    }
  }

  // GET /get-vocabulary/:id
  async getVocabularyById(req, res) {
    try {
      const { id } = req.params;
      const vocabulary = await Vocabulary.findById(id);
      if (!vocabulary) {
        return res.status(404).json({ message: "Vocabulary not found" });
      }
      res.status(200).json(vocabulary);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching vocabulary", error: err.message });
    }
  }

  // POST /create
  async createVocabulary(req, res) {
    try {
      const { englishWord, vietnameseMeaning, partOfSpeech, exampleSentence } =
        req.body;

      const newVocabulary = new Vocabulary({
        englishWord,
        vietnameseMeaning,
        partOfSpeech,
        exampleSentence,
      });

      await newVocabulary.save();

      res.status(201).json({
        message: "Vocabulary created successfully",
        data: newVocabulary,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error creating vocabulary", error: err.message });
    }
  }

  // PUT /update/:id
  async updateVocabulary(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const updatedVocabulary = await Vocabulary.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );

      if (!updatedVocabulary) {
        return res.status(404).json({ message: "Vocabulary not found" });
      }

      res.status(200).json({
        message: "Vocabulary updated successfully",
        data: updatedVocabulary,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error updating vocabulary", error: err.message });
    }
  }

  // DELETE /delete/:id
  async deleteVocabulary(req, res) {
    try {
      const { id } = req.params;

      const deletedVocabulary = await Vocabulary.findByIdAndDelete(id);
      if (!deletedVocabulary) {
        return res.status(404).json({ message: "Vocabulary not found" });
      }

      res.status(200).json({
        message: "Vocabulary deleted successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error deleting vocabulary", error: err.message });
    }
  }

  // POST /random
  async getRandomVocabularies(req, res) {
    try {
      const { count = 10 } = req.body; // Số từ vựng ngẫu nhiên cần lấy (mặc định là 10)

      const randomVocabularies = await Vocabulary.aggregate([
        { $sample: { size: parseInt(count, 10) } },
      ]);

      res.status(200).json({
        message: `${count} random vocabularies fetched successfully`,
        data: randomVocabularies,
      });
    } catch (err) {
      res
        .status(500)
        .json({
          message: "Error fetching random vocabularies",
          error: err.message,
        });
    }
  }
}

module.exports = new VocabulariesController();
