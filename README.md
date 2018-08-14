# serverless-python-requirements-common-copy
A Serverless framework plugin to copy specified directory or file into artifact

*Works with [serverless-python-requirements](https://github.com/UnitedIncome/serverless-python-requirements)*

*Requires Serverless >= v1.12*

*Supported only using with [Per-function requirements](https://github.com/UnitedIncome/serverless-python-requirements#per-function-requirements)*

## Install
```
npm install --save serverless-python-requirements-common-copy
```

## Source directory structure

Same as [serverless-python-requirements](https://github.com/UnitedIncome/serverless-python-requirements)

```
├── serverless.yml
└── src
     ├── function1
     │      ├── requirements.txt
     │      └── function1.py
     ├── function2
     │      ├── requirements.txt
     │      └── function2.py
     └── function3
            ├── requirements.txt
            └── function3.py
```

## Settings

serverless.yml
```yaml
plugins:
  - serverless-python-requirements
  - serverless-python-requirements-common-copy

provider:
  # This is example
  name: aws
  profile: AWS_PROFILE_NAME
  region: ap-northeast-1
  runtime: python3.6

package:
  individually: true

custom:
  pythonRequirements:
    # This is example
    dockerizePip: true
    dockerImage: lambci/lambda:build-python3.6
    zip: false
    slim: true
  pythonRequirementsCommonCopy:
    # Put your desired directory or file
    - ./common/some_lib.py  # example of file
    - ./environments        # example of directory
 
functions:
  function1:
    module: src/function1
    handler: function1.lambda_handler    
    pythonRequirementsCommonCopy:
      - ./key/hoge.pem  # example of file
      - ./some_dir      # example of directory
  function2:
    module: src/function2
    handler: function2.lambda_handler    
    pythonRequirementsCommonCopy:
      - ./key/fuga.pem  # example of file
      - ./some_dir      # example of directory
  function3:
    module: src/function3
    handler: function3.lambda_handler
    # just omit `pythonRequirementsCommonCopy` to ignore this plugin
```

## Artifacts after packaging

Inside zip file

```
├── function1.py
├── requests             # library directory from requirements.txt
├── common
│    └── some_lib.py     # specified file by service level
├── environments         # specified directory by service level
│      ├── setting.json
│      └── secret.txt
├── key
│    └── hoge.pem        # specified file by function level
└── some_dir             # specified directory by function level
       ├── foo.py
       └── bar.py
```

## TODO

* Automatic testing

## License
MIT
