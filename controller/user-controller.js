import { userService } from '../services/index.js';
import * as tools from '../utils/exception-tools.js';

const addUser = async (req, res, next) => {
  try {
    tools.isHeaderJSON(req.body);

    const { email, password, name, nickname, address, role, age } = req.body;

    const userInfo = {
      email,
      password,
      name,
      nickname,
      address,
      role,
      // ...(role || { role: 'user' }),
      age,
    };
    await userService.addUser(res, userInfo);
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { token, userId } = await userService.getUserToken(
      res,
      email,
      password
    );

    // 로그인 진행 성공시 userId(문자열) 와 jwt 토큰(문자열)을 프론트에 보냄
    // res.status(200).json({ userId, token });
    res.status(200).json({ token, userId });
  } catch (error) {
    console.log(error);
  }
};

const userPasswordCheck = async (req, res, next) => {
  try {
    const { password } = req.body;
    const users = await userService.getUser(req.user.id);

    const isPassword = await userService.checkPassword(password, users);

    // 로그인 진행 성공시 userId(문자열) 와 jwt 토큰(문자열)을 프론트에 보냄
    // res.status(200).json({ userId, token });
    res.status(200).json({ isPassword });
  } catch (error) {
    console.log(error);
  }
};

const socialLoginToken = async (req, res) => {
  try {
    const userEmail = String(req.body.data.data.id);
    const { token, userId } = await userService.getUserTokenByEmail(userEmail);
    res.status(200).json({ token, userId });
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const users = await userService.getUser(userId);

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const delUserById = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함. (폼에서 현재비번 제출받음)
    const password = req.body.password;

    // currentPassword 없을 시, 진행 불가
    if (!password) {
      return res.status(400).send({
        error: '회원정보 삭제를 위해, 현재의 비밀번호가 필요합니다.',
      });
    }

    await userService.deleteUser(res, userId, password);
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    tools.isHeaderJSON(req.body);

    const userId = Number(req.params.userId);
    const {
      email,
      password,
      name,
      nickname,
      phoneNumber,
      address,
      role,
      age,
      profileImg,
      profileText,
      // currentPassword,
    } = req.body;

    // if (!currentPassword) {
    //   return res.status(400).send({
    //     error: '정보를 변경하려면, 현재의 비밀번호가 필요합니다.',
    //   });
    // }

    // const userInfoRequired = { userId, currentPassword };

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(email && { email }),
      ...(password && { password }),
      ...(name && { name }),
      ...(nickname && { nickname }),
      ...(phoneNumber && { phoneNumber }),
      ...(address && { address }),
      // ...(phoneNumber && { phoneNumber }),
      ...(role && { role }),
      ...(age && { age }),
      ...(profileImg && { profileImg }),
      ...(profileText && { profileText }),
    };

    await userService.setUser(userId, toUpdate, res);
  } catch (error) {
    next(error);
  }
};

export {
  addUser,
  userLogin,
  userPasswordCheck,
  socialLoginToken,
  getUsers,
  getUser,
  delUserById,
  updateUserById,
};
