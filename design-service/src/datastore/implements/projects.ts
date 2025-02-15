import conn from "../../connection";
import { ProjectDao } from "../dao/projectDao";
import * as type from "../../contracts/types";
import { MyQuery } from "../query";

export class projectDataStore implements ProjectDao {
  /**
   * @param newProjectDB
   * @returns
   * project_id: number
   * @description
   * this function takes in a newProjectDB object
   * and returns the project_id of the newly created project
   * first it creates an array of the keys of the newProjectDB object
   * then it creates a new array of the values of the newProjectDB object to ensure the order of the keys
   * then it creates a new project in the database and returns the project_id
   */
  async createProject(newProjectDB: type.CreateProjectDB): Promise<number> {
    const project: type.CreateProjectDB[] = [];

    // to ensure the order of the keys
    const keys = [
      "name",
      "boundary",
      "door_position",
      "constraints",
      "project_img",
      "project_icon",
      "user_id",
    ];
    keys.forEach((key) => {
      project.push(newProjectDB[key]);
    });
    try {
      const project_id = await (
        await conn.query(MyQuery.createProject, project)
      ).rows[0].id;
      return Promise.resolve(project_id);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getProject(project_id: number): Promise<type.Project> {
    try {
      const result = await conn.query(MyQuery.getProject, [project_id]);
      return Promise.resolve(result.rows[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getProjectCopy(project_id: number): Promise<type.ProjectCopy> {
    try {
      const result = await conn.query(MyQuery.getProjectCopy, [project_id]);
      return Promise.resolve(result.rows[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getProjects(user_id: string): Promise<type.Project[]> {
    try {
      const result = await conn.query(MyQuery.getProjects, [user_id]);
      return Promise.resolve(result.rows);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateProjectName(project_id: number, name: string): Promise<void> {
    try {
      await conn.query(MyQuery.updateProjectName, [name, project_id]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async moveProjectToTrash(project_id: number): Promise<void> {
    try {
      conn.query(MyQuery.moveProjectToTrash, [project_id]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async restoreProjectFromTrash(project_id: number): Promise<void> {
    try {
      conn.query(MyQuery.restoreProjectFromTrash, [project_id]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
    //
  }

  async deleteProject(project_id: number): Promise<void> {
    try {
      conn.query(MyQuery.deleteProject, [project_id]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
    //
  }
}
