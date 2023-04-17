
require('dotenv').config()
const Docker = require('dockerode');

// Create a Docker client instance
const docker = new Docker();

// Define the name of your container
const containerName = process.env.CONTAINER_NAME;
console.log(containerName)

setInterval(() => {
  docker.listContainers({ all: true }, (err, containers) => {
    if (err) {
      console.error(err);
      return;
    }
    
    const container = containers.find(c => c.Names.includes(`/${containerName}`));
    
    if (container) {
      if (container.State === 'running') {
        console.log('Container is running');
      } else {
        // Start the container
        const c = docker.getContainer(container.Id);
        c.start((err) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Container started');
          }
        });
      }
    } else {
        console.log("Container not found")
    }
  });
}, 10000); // Wait for 10 seconds before checking again
