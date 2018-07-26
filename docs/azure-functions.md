# Azure Functions Example

## Pre Requisites 

* **Node.js 8.5 or greater**
* **Docker running locally**
* **Azure CLI (or Cloud Shell)**
* **[Azure Functions Core Tools v2](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local)**

## Step 1:

Go to ```project directory -> example -> azure-functions```

After installing the pre requisities, you need to create a project in the above mentioned directory from Azure Fucntions Core Tools in order to create a function.

```func init . --docker```

![Functions-Step1](./../src/assets/function-step1.png)

With the above command, you will be creating a functions project. Then at the end we will be providing a "--docker" in order to create a Dockerfile along with the initial stage.

In MacOS, this wasn't working for some reason, if so create a dockerfile after initializing the project.

### DockerFile

```
FROM microsoft/azure-functions-runtime:v2.0.0-beta1
ENV AzureWebJobsScriptRoot=/home/site/wwwroot
COPY . /home/site/wwwroot
```

## Step 2: 

Create a function type accordingly with the following command.

```func new```

![Functions-Step2](./../src/assets/function-step2.png)

## Step 3:

Go to the created function. For me it's HttpTriggerJS folder -> function.json
Change the authLevel to "anonymous".

![Functions-Step3](./../src/assets/function-step3.png)

## Step 4: 

Create a .tar file for the azure function project.

Go to the project directory where Dockerfile is placed.

MacOS: 

From the Terminal, you can simply do this:
```tar czf archive_folder_name.tar folder_to_copy```
Replace the archive_folder_name.tar with your own init file name.
Place the folder_to_copy to the folder you want to add (which is your project directory).

Example:
```tar czf function-sample.tar ./```

Windows:
Use some tool such as [7ZIP](https://www.7-zip.org)

## Step 5: 

Pull the docker image

```docker pull microsoft/azure-functions-node8```

## Step 6: 

Go to project terminal and init the file

* **Init Functions**
```
clocal function-init <folder> <init-file>
```
Azure functions working directory is located in example/azure-functions.
You can create a folder inside the location and give the folder location.
Then attach the init file where the service starting file.

Example: ```clocal function-init function-sample function-sample.tar```

* **Start Functions**
```
clocal function-start
```
* **Stop Functions**
```
 clocal function-stop 
 ```

## Expected Result

![Functions-Result1](./../src/assets/function-result1.png)

![Functions-Result2](./../src/assets/function-result2.png)

![Functions-Result3](./../src/assets/function-result3.png)



