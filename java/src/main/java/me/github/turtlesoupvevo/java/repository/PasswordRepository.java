package me.github.turtlesoupvevo.java.repository;

import me.github.turtlesoupvevo.java.model.EncodedPassword;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PasswordRepository extends MongoRepository<EncodedPassword, String> {

    @Query("{}")
    EncodedPassword findFirstDocument(@Param("limit") int limit);
}
