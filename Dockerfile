FROM node:20.18.0-alpine

# Installation de netcat
RUN apk add --no-cache netcat-openbsd

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@9.15.4

WORKDIR /app

# Variables d'environnement pour Prisma et l'authentification
ENV DATABASE_URL="postgresql://postgres:postgres@db:5432/nextscape"
ENV DIRECT_URL="postgresql://postgres:postgres@db:5432/nextscape"
ENV SHADOW_DATABASE_URL="postgresql://postgres:postgres@db:5432/nextscape_shadow"
ENV BETTER_AUTH_SECRET=6rFpYfLvhqcnc1ZUmv1KlceheIXIKNaI
ENV BETTER_AUTH_URL=http://localhost:3000
ENV GOOGLE_CLIENT_ID=""
ENV GOOGLE_CLIENT_SECRET=""

# Copier les fichiers nécessaires pour l'installation
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Installation sans exécuter les scripts post-install
RUN pnpm install --ignore-scripts

# Générer le client Prisma
RUN pnpm prisma generate

# Copier le script d'entrée et le rendre exécutable
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Copier le reste des fichiers
COPY . .

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["pnpm", "run", "dev"]