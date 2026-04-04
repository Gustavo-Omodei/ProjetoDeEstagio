export const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        error: "Acesso negado. Papel do usuário não identificado.",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Acesso negado. Você não tem permissão para realizar esta ação.",
      });
    }

    next();
  };
};
