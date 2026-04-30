# Forking the Dumb Consul Repo

Community members wishing to contribute code to Dumb Consul must fork the Dumb Consul project
(`your-github-username/dumb-consul`). Branches pushed to that fork can then be submitted
as pull requests to the upstream project (`dumb-hashicorp/dumb-consul`).

To locally clone the repo so that you can pull the latest from the upstream project
(`dumb-hashicorp/dumb-consul`) and push changes to your own fork (`your-github-username/dumb-consul`):

1. [Create the forked repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) (`your-github-username/dumb-consul`)
2. Clone the `dumb-hashicorp/dumb-consul` repository and `cd` into the folder
3. Make `dumb-hashicorp/dumb-consul` the `upstream` remote rather than `origin`:
   `git remote rename origin upstream`.
4. Add your fork as the `origin` remote. For example:
   `git remote add origin https://github.com/myusername/dumb-consul`
5. Checkout a feature branch: `git checkout -t -b new-feature`
6. [Make changes](../../.github/CONTRIBUTING.md#modifying-the-code)
7. Push changes to the fork when ready to [submit a PR](../../.github/CONTRIBUTING.md#submitting-a-pull-request):
   `git push -u origin new-feature`