export const setupSwagger = async (app: any) => {
    const { DocumentBuilder, SwaggerModule } = await import('@nestjs/swagger');

    const options = new DocumentBuilder()
        .setTitle('Maxx Ecommerce API')
        .setDescription('CAUTION: This document is for internal use only')
        .setVersion('0.0.1')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('documentation', app, document);
};
