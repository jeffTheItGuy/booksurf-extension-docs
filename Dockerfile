# Base image
FROM node:20-slim

# Install required system dependencies
RUN apt-get update && apt-get install -y \
    git \
    bash \
    && rm -rf /var/lib/apt/lists/*

# Set working directory FIRST so npm installs to /app/node_modules
WORKDIR /app

# Copy package.json and install deps as root
COPY package.json ./
RUN npm install --no-cache

# Create non-root user with bash history support
RUN useradd -ms /bin/bash devuser && \
    mkdir -p /home/devuser/.cache /home/devuser/.history && \
    touch /home/devuser/.history/bash_history && \
    chown -R devuser:devuser /home/devuser && \
    chown -R devuser:devuser /app

USER devuser

# Bash history setup
RUN echo 'export HISTSIZE=1000\n\
export HISTFILESIZE=2000\n\
export HISTFILE=/home/devuser/.history/bash_history\n\
shopt -s histappend\n\
PROMPT_COMMAND="history -a; history -n; $PROMPT_COMMAND"\n' \
>> /home/devuser/.bashrc

# Copy project files
COPY --chown=devuser:devuser . .

EXPOSE 8080

SHELL ["/bin/bash", "-c"]

CMD ["node", "server.js"]