#! /bin/bash
# coloring https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

LIVE_IS_COMPOSER_MODE=1

# handling arguments
checkIfInstallNecessary=0

for variable in "$@"
do
    case "${variable}" in
        check) checkIfInstallNecessary=1
        ;;
    esac
done

# if "check" parameter given, check first before install
if [ "$checkIfInstallNecessary" = "1" ]
  then
    if [ -d ".ddev/commands" ] && [ -d ".typo3/bin" ];
      then
        printf "${GREEN}-> Install check: project setup is ready.${NC}\n"
        exit 0
    fi
fi

# do not double start this script:
if test -f "./Build/Development/INSTALLATION_RUNNING";
  then
    exit
fi

# project vars
printf "${GREEN}-> Get a new DDEV System.${NC}\n"

# blocking other scripts while intall process
touch ./Build/Development/INSTALLATION_RUNNING

# Init default config
printf "${GREEN}-> Init default config for TYPO3...${NC}\n"
if [ "$LIVE_IS_COMPOSER_MODE" = "0" ]
    then
      [ -L .config/sites ] || ( mkdir -p config/ && ln -snvf ../Build/Server/typo3conf/sites config/ )
    else
      [ -L config/sites ] || ( mkdir -p config/ && ln -snvf ../Build/Server/config/sites config/ )
fi


printf "${GREEN}-> Run ddev config.${NC}\n"
ddev config --project-type=typo3 --docroot=.typo3/public --create-docroot

# install phpMyAdmin
ddev get ddev/ddev-phpmyadmin

########################
##### Start DDEV   #####
printf "${GREEN}-> Run ddev start while install process.${NC}\n"
ddev start

# run composer on ddev
printf "${GREEN}-> Run composer install --no-scripts...${NC}\n"
ddev composer install --no-scripts


# Non interactive automatic setup of a new TYPO3 instance
printf "${GREEN}-> Try to setup TYPO3 default...${NC}\n"
ddev typo3 install:setup --no-interaction \
   --database-user-name="db" \
   --database-host-name="db" \
   --database-port="3306" \
   --database-name="db" \
   --admin-user-name="test" \
   --admin-password="sdaKASDKA-16" \
   --site-name="ContentBlocksDemo"

# touch public/FIRST_INSTALL
[ -d ./.typo3/var/transient ] || mkdir -p ./.typo3/var/transient
touch ./.typo3/var/transient/ENABLE_INSTALL_TOOL

# symlink .htaccess file after composer setup
[ -d ./.typo3/public ] || mkdir -p ./.typo3/public
[ -L ./.typo3/public/.htaccess ] || ( ln -snvf ../../Build/Server/.htaccess ./.typo3/public/.htaccess )


# stop blocking other scripts while intall process
rm ./Build/Development/INSTALLATION_RUNNING


# make sure, composer scripts are executed successfully
ddev composer dump
