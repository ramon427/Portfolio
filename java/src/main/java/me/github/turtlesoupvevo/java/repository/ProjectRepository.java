package me.github.turtlesoupvevo.java.repository;

import me.github.turtlesoupvevo.java.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {

    List<Project> findByTitle(String title);
}
