package com.web.config;


import com.cloudinary.Cloudinary;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
@SpringBootApplication
public class CloudConfig {

    @Bean
    public Cloudinary cloudinaryConfigs() {
        Cloudinary cloudinary = null;
        Map config = new HashMap();
        config.put("cloud_name", "dv1ugawfe");
        config.put("api_key", "915924352854454");
        config.put("api_secret", "y3jJ5JcUJpm-IUU-0lJUjh42KW4");
        cloudinary = new Cloudinary(config);
        return cloudinary;
    }
}
