import jwt, { Secret } from "jsonwebtoken";

const createTocken = (payload:object, secret: Secret, expiresTime: string): string => {
    return jwt.sign(payload, secret, {expiresIn: expiresTime})
}


const verifiedTocken = (tocken: string, secret: Secret) => {
  return  jwt.verify(tocken, secret);
}

export const jwtHelpers = {
    createTocken,
    verifiedTocken
}