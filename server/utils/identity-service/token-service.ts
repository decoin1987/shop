// @ts-nocheck
import jwt from 'jsonwebtoken'
import {Token} from '../../models/token';



export default new class TokenService {

  generateTokens (payload: any) {
    let accessToken:string;
    let refreshToken:string;
    accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as unknown as string, { expiresIn: '24h' })
    refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as unknown as string, { expiresIn: '30d' })
    return {
      accessToken,
      refreshToken
    }
  }

  // https://youtu.be/fN25fMQZ2v0?t=1816 токены

  async saveToken (userId: string, refreshToken: string) {
    const token = await Token.findOne({ where: { id: userId } })
    if (token) {
      token.refreshToken = refreshToken
      token.save()
      return
    } else return await Token.create({id: userId, refreshToken})
  }
}()

