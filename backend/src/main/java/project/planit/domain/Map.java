package project.planit.domain;

import jakarta.persistence.*;

@Entity
public class Map {

    @Id
    @GeneratedValue
    private Long id;

    private String placeName;
    private String placeLocation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;
}
