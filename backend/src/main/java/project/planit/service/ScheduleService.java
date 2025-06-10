package project.planit.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.planit.domain.Schedule;
import project.planit.repository.ScheduleRepository;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    /**
     *  plan에서 만들어버리니 save는 필요가 없나..?
     *  나도 그래서 update만 만들긴 했는데 일단 만들어두면 언젠간 쓸듯
     */
    @Transactional
    public void saveSchedule(Schedule schedule) {
        scheduleRepository.save(schedule);
    }

    @Transactional
    public void updateSchedule(Schedule schedule) {
        Schedule findSchedule = scheduleRepository.findById(schedule.getId());
        if (findSchedule == null) {
            throw new IllegalArgumentException("존재하지 않는 일정입니다.");
        }

        findSchedule.update(
                schedule.getDescription(),
//                schedule.getBudget(),
                schedule.getMaps()
        );

        if (schedule.getMaps() != null) {
            findSchedule.getMaps().clear();  // 기존 데이터 초기화
            findSchedule.getMaps().addAll(schedule.getMaps());  // 새 데이터 등록
        }
    }
}
