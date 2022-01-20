# Docker Bin Stubs

This folder contains bin stubs to make it easier to run commands inside the
running dev env docker container.

Dev env container scripts:

- `setup.bash` : source this to put the script directory on your PATH
- `dev-up` : start the dev env in the background (building it if it doesn't
  exist)
- `dev-attach` : get a command prompt inside the running dev env
- `dev-exec` : run an arbitrary command inside the dev env
- `dev-down` : stop the dev env
- `dev-build` : explicitly build the dev env (useful if you have stale cache
  layers)

Some specific commands for convenience:

- `deno` : run roscore inside the dev env
- ... : etc.

## Usage

Set your working directory to the repo root and add this directory at the
beginning of your `PATH` (to override any exisiting scripts with the same name):

```bash
cd ~/repo
source .dockerbin/setup.bash
```

Then call the scripts as required:

```bash
dev-up
dev-exec ls
dev-attach
dev-down
```

## Troubleshooting

**Unknown IP or packages**

Docker will cache previously built image layers. That can cause issues when
external services like `apt` change over time.

If you can't build the docker image due to errors that mention missing IP
addresses or packages then there's a good chance you've this this particular
issue. An example build error message:

```
...
Err:13 http://packages.ros.org/ros/ubuntu bionic/main amd64 python3-catkin-tools all 0.7.1-1
  404  Not Found [IP: 64.50.233.100 80]
...
```

The fix is to rebuild the image, explicitly instructing docker not to use it's
cached layers:

```bash
dev-build --no-cache
```
