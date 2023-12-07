<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-success">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Subject Assignment System</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Students
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/"
                  >Show students</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/student/StudentNew"
                  >New student</router-link
                >
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Professors
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/professor/HomeView"
                  >Show professors</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/professor/ProfessorNew"
                  >New professors</router-link
                >
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Subjects
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/subject/HomeView"
                  >Show subjects</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/subject/ProfessorNew"
                  >New subject</router-link
                >
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Programs
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/program/HomeView"
                  >Show programs</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/program/ProgramNew"
                  >New programs</router-link
                >
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Assignments
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link
                  class="dropdown-item"
                  to="/professor_subject/AssignmentSubjectProfessor"
                  >Assign subject to professor</router-link
                >
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  to="/student_subject_professor/AssignmentSubjectStudent"
                  >Assign subject to student</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container-fluid">
    <router-view />
  </div>
</template>
