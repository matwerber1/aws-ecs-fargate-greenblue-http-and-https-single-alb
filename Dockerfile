# our container starts with a linux VM pre-configured with Linux + NodeJS 9
# we give this initial starting point an alias of "build"
FROM node:9 AS build

# within the container, create and move to the /app directory to house or application
WORKDIR /app

# copy package.json (which contains our node dependencies) from the git repo to the docker image
ADD package.json .

# within the image, download and install all dependencies from package.json
RUN npm install

# now, start with a new, fresh "slimmed down" version of Linux+Node9 with minimal bloat to
# give us faster container startup and smaller footprint
FROM node:9-slim

# Copy the build from the build alias to our new clean environment
COPY --from=build /app .

# Add all other files from our git repo to our current environment
ADD . .

# When our container runs, allow incoming traffic on ports 80 and 443 
EXPOSE 80 443

# When our container runs, execute the command "node index.js"
CMD ["node", "index.js"]
