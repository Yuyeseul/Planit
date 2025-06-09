package project.planit.domain;

import jakarta.persistence.*;

@Entity
public class Budget {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne(mappedBy = "budget")
    private Schedule schedule;

    private int amount;
    private String type;
}