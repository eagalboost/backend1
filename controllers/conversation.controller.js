import Conversation from "../models/conversation.model.js";

export const createConversation = async (req, res, next) => {
  try {
    const existingConversation = await Conversation.findOne({
      adminId: req.isAdmin ? req.userId : req.body.to,
      buyerId: req.isAdmin ? req.body.to : req.userId,
    });

    if (existingConversation) {
      return res.status(200).json(existingConversation);
    }

    const newConversation = new Conversation({
      id: req.isAdmin
        ? `${req.userId}${req.body.to}`
        : `${req.body.to}${req.userId}`,
      adminId: req.isAdmin ? req.userId : req.body.adminId,
      buyerId: req.isAdmin ? req.body.adminId : req.userId,
      readByAdmin: req.isAdmin,
      readByBuyer: !req.isAdmin,
    });

    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (error) {
    next(error);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isAdmin ? { adminId: req.userId } : { buyerId: req.userId }
    );
    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};

// Controller to get a single conversation by its ID
export const getSingleConversation = async (req, res, next) => {
  try {
    const conversationId = req.params.id; // Ensure this ID is passed correctly
    console.log("Fetching conversation with ID:", conversationId); // For debugging

    const conversation = await Conversation.findById(conversationId); // Correct query
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    res.status(200).json(conversation); // Return the conversation if found
  } catch (error) {
    console.error("Error fetching conversation:", error);
    next(error);
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          readByAdmin: req.isAdmin,
          readByBuyer: !req.isAdmin,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedConversation);
  } catch (error) {
    next(error);
  }
};
