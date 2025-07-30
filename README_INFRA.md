# Documentación de Infraestructura AWS (CloudFormation)

## Descripción
Esta plantilla (`infraestructura.yaml`) permite desplegar una arquitectura completa en AWS para una aplicación con:
- **Frontend React**: S3 + CloudFront
- **Backend FastAPI**: ECS Fargate + Application Load Balancer
- **Base de datos**: DynamoDB (Funds, Transactions, Users, Subscriptions)

---

## Parámetros de la plantilla
- `FrontendBucketName`: Nombre del bucket S3 para el frontend (por defecto: fondos-frontend-app)
- `BackendImageUrl`: URL de la imagen Docker de FastAPI (ECR o DockerHub)
- `VpcId`: VPC donde se desplegará el backend
- `SubnetIds`: Lista de subredes públicas para ECS y el Load Balancer

---

## Recursos creados
### DynamoDB
- **FundsTable**: Tabla para fondos (`fund_id` como clave primaria)
- **TransactionsTable**: Tabla para transacciones (`transaction_id` como clave primaria)
- **UsersTable**: Tabla para usuarios (`user_id` como clave primaria)
- **SubscriptionsTable**: Tabla para suscripciones (`subscription_id` como clave primaria)

### Frontend
- **ReactAppBucket**: Bucket S3 para archivos estáticos de React
- **ReactAppDistribution**: CloudFront para servir el frontend globalmente

### Backend
- **BackendCluster**: ECS Cluster para contenedores
- **BackendTaskDefinition**: Definición de tarea para FastAPI (Docker)
- **BackendService**: Servicio ECS Fargate
- **BackendALB**: Application Load Balancer
- **BackendTargetGroup** y **BackendListener**: Routing HTTP
- **BackendTaskExecutionRole**: Permisos para ECS y acceso a DynamoDB

---

## Outputs
- `FundsTableName`, `TransactionsTableName`, `UsersTableName`, `SubscriptionsTableName`: Nombres de las tablas DynamoDB
- `FrontendBucketName`: Nombre del bucket S3
- `FrontendCloudFrontURL`: URL pública del frontend
- `BackendALBURL`: URL pública del backend

---

## Instrucciones de despliegue

1. **Sube tu imagen Docker de FastAPI a ECR o DockerHub**
2. **Construye tu frontend React** (`npm run build`) y súbelo al bucket S3 creado
3. **Despliega la plantilla** desde la consola de AWS o CLI:
   ```
   aws cloudformation deploy --template-file infraestructura.yaml --stack-name mi-app-stack --capabilities CAPABILITY_NAMED_IAM --parameter-overrides BackendImageUrl=<URL_IMAGEN> VpcId=<VPC_ID> SubnetIds=<SUBNET1>,<SUBNET2>
   ```
4. **Accede a las URLs** de salida para probar tu frontend y backend

