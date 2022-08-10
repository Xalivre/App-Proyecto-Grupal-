import User from '../models/User.js';
import { encrypt } from './helpers/handleBCrypt.js';
import Payment from '../models/Payments.js';
import { sendMail } from '../librarys/emailer.js';

export const forcePasswordAdmin = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) return res.status(404).send('User not found');
    let chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let passwordLength = 12;
    let defaultPassword = '';

    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      defaultPassword += chars.substring(randomNumber, randomNumber + 1);
    }

    const passwordHash = await encrypt(defaultPassword);

    const userDB = await User.findOneAndUpdate(
      { email },
      {
        password: passwordHash,
      },
      { new: true }
    );

    sendMail(email, userDB.username, null, null, defaultPassword)
      .then((r) => console.log('password reseted'))
      .catch((err) => console.log(err));

    if (!userDB) return res.status(404).send('User not found');

    return res.json({ msg: 'Password updated' });
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const changeState = async (req, res) => {
  const { paymentId, state, userId } = req.body;

  try {
    const user = await User.findById(userId);
    const updatedPayment = await Payment.findByIdAndUpdate(
      paymentId,
      { state: state },
      { new: true }
    );
    if (!updatedPayment) return res.status(404).send('Payment not found');
    updatedPayment.save();

    const updatePaymentHistory = user.paymentHistory.map((item) =>
      item._id.toString() === paymentId ? updatedPayment : item
    );

    user.paymentHistory = updatePaymentHistory;
    user.save();

    const paymentObjectEmail = updatedPayment.container.map((e) => e.name);
    if (state === 'despachado') {
      sendMail(user.email, user.username, null, paymentObjectEmail);
    }

    return res.json(user);
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const searchStatePayment = async (req, res) => {
  try {
    const despachado = [];
    const pendiente = [];
    const finalizado = [];
    const cancelado = [];

    const allPayment = await Payment.find({});
    if (!allPayment) return res.json({ msg: 'No payments found' });

    allPayment.map((e) =>
      e.state === 'despachado'
        ? despachado.push(e)
        : e.state === 'pendiente'
        ? pendiente.push(e)
        : e.state === 'finalizado'
        ? finalizado.push(e)
        : cancelado.push(e)
    );

    return res.json({ despachado, pendiente, finalizado, cancelado });
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const searchUserByUsername = async (req, res) => {
  const { username } = req.body;
  try {
    const users = await User.find({});
    if (users) {
      const foundUser = users.filter((e) =>
        e.username.toLowerCase().includes(username)
      );
      return res.status(200).json(foundUser);
    }
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};
