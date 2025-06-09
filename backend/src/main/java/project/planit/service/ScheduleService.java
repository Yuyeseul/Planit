package project.planit.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.planit.domain.Member;
import project.planit.domain.Schedule;
import project.planit.repository.ScheduleRepository;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    @Transactional
    public void saveSchedule(Schedule schedule) {
        scheduleRepository.save(schedule);
    }

    /**
     * 이게 맞는지 모르겠다..
     */
    @Transactional
    public void updateSchedule(Schedule schedule) {
        Schedule findSchedule = scheduleRepository.findById(schedule.getId());
        if (findSchedule == null) {
            throw new IllegalArgumentException("존재하지 않는 일정입니다.");
        }

        findSchedule.setDescription(schedule.getDescription());
        findSchedule.setBudget(schedule.getBudget());
        if (schedule.getMaps() != null) {
            findSchedule.getMaps().clear();  // 기존 데이터 초기화
            findSchedule.getMaps().addAll(schedule.getMaps());  // 새 데이터 등록
        }
    }
}
