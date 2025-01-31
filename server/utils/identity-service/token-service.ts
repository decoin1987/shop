// @ts-nocheck
import jwt from 'jsonwebtoken'
import * as jose from "jose";
import {Token} from '../../models/token';



export default new class TokenService {

  generateTokens (payload: any) {
    let accessToken:string;
    let refreshToken:string;
    accessToken = jwt.sign(payload, process.env.NUXT_API_JWT_ACCESS_SECRET as unknown as string)
    refreshToken = jwt.sign(payload, process.env.NUXT_API_JWT_REFRESH_SECRET as unknown as string)
    return {
      accessToken,
      refreshToken
    }
  }

  compareTokens (oldToken, newToken) {
    try {
      jwt.verify(oldToken, process.env.NUXT_API_JWT_REFRESH_SECRET as unknown as string)
      jwt.verify(newToken, process.env.NUXT_API_JWT_REFRESH_SECRET as unknown as string)
      return oldToken === newToken;
    } catch (e) {
      return false
    }
  }

  // https://youtu.be/fN25fMQZ2v0?t=1816 токены

  async saveToken (userId: string, refreshToken: string) {
    const token = await Token.findOne({ where: { id: userId } })
    if (token) {
      token.refresh_token = refreshToken
      token.save()
      return
    } else return await Token.create({id: userId, refreshToken})
  }
}

