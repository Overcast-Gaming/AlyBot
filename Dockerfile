FROM node:lts-alpine
# Install the stuff™
RUN apt update && apt install -y nodejs
RUN npm install mineflayer discord.js
# Clone the stuff™
RUN git clone https://github.com/Overcast-Gaming/AlyBot.git /app
# Work in the stuff™
WORKDIR /app
# Run the stuff™
CMD ["node", "index"]