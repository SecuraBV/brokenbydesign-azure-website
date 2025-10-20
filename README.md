# Azure vulnerable application - Website
<img width="759" alt="broken by design white" src="https://user-images.githubusercontent.com/14212955/180998359-a17af967-84bc-4541-af75-06a1ea4e5927.png">

A vulnerable Azure architecture that is online 24/7.
The environment provides several flags that can be found by exploiting Azure vulnerabilities.
This repository contains the source code of the website

## Links
- Link to tool is: https://brokenazure.cloud
- File issues at: https://github.com/SecuraBV/brokenbydesign-azure-website/issues
- Link to Terraform source code is: https://github.com/SecuraBV/brokenbydesign-azure
- Created by: https://cybersecurity.bureauveritas.com


## Contributing
If you would like to add a new challenge path, please note that the first character of the folder name is incremental (first challenge starts with `a`, second with `b` etc) to keep the folders in the front-end organized. All folders have a length of `26` characters. Please make sure to also change the Backend!

## Deploy
To deploy a new version, all you have to do is:
1. Login with the correct credentials using `az login`
2. Execute `az storage blob upload-batch -s <source-path> -d '$web' --account-name <storage-account-name>` (full command `az storage blob upload-batch -s src/ -d '$web' --account-name vulnwebsite --overwrite`)
3. ???
4. ~~Profit!~~ Done!