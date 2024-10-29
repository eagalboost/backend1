import Order from "../models/order.model.js";
import Service from "../models/service.model.js";
import User from "../models/user.model.js";

export const createOrder = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.serviceId);
    const buyer = await User.findById(req.userId);

    const newOrder = new Order({
      serviceId: service._id,
      image: service.coverImage,
      title: service.title,
      buyerId: req.userId,
      adminId: service.userId,
      buyerUsername: buyer.username,
      price: req.body.price,
      payment_intent: "temporary",
    });

    await newOrder.save();
    res.status(200).send("Successful");
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isAdmin ? { adminId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.orderId);
      if (!order) return res.status(404).send("Order not found");
  
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };