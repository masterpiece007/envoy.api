// export default () => ({
//     secret: process.env.JWT_SECRET,    
//     signOptions: { expiresIn: '1h' },
//    })
   export default {
    secret: process.env.JWT_SECRET ?? '',
   }