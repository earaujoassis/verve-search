# Verve Search

> A web search interface for the Verve API

This project was developed as a technical test and a proof of concept for a selection process (July 2018).
**It is not maintained anymore**.

## Setup & Running

Please make sure you have Ruby 2.5.x and Nodejs v8.11.x installed; if you're using RVM, NVM or ASDF, there
are already `.ruby-version`, `.nvmrc` and `.tool-versions` files available). I'm also using MongoDB as the
back-end data-store; please provide the configuration according to the `config/mongoid.yml` file. The packages
under the `web` folder should be installed through *yarn*. Once those requirements are met, run the following
commands to setup and run the servers:

```sh
$ bin/project-setup
$ foreman start
```

A browser window/tab is automatically opened for `http://localhost:3000`.

## Issues

Please take a look at [/issues](https://github.com/earaujoassis/verve-search/issues)

## License

[MIT License](http://earaujoassis.mit-license.org/) &copy; Ewerton Assis
