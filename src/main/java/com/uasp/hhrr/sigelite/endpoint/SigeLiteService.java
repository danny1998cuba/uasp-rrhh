/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.sigelite.endpoint;

import com.uasp.hhrr.sigelite.models.F5202_07;
import com.uasp.hhrr.sigelite.models.F5202_07FillHelper;
import com.uasp.hhrr.sigelite.models.F5205_02;
import com.uasp.hhrr.sigelite.models.F5205_02FillHelper;
import java.util.Calendar;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Tapanes
 */
@Service
public class SigeLiteService {

    @Autowired
    F5202_07FillHelper helper_5202;

    @Autowired
    F5205_02FillHelper helper_5205;

    public F5202_07 generate_5202(Map<String, Object> params) {
        F5202_07.F5202_07Builder builder = new F5202_07.F5202_07Builder(Calendar.getInstance().get(Calendar.MONTH) - 1, "28");

        if (params.containsKey("observ")) {
            builder.setObservaciones(params.get("observ").toString());
        } else {
            builder.setObservaciones("VmFsaWRhIGNvbiBhbGVydGFzIGRlYmlkbyBhbCA1MjAy");   //Mensaje encriptado obtenido directamente del SigeLite
        }

        F5202_07 model = builder.build();
        helper_5202.fillModel(model);

        return model;
    }

    public F5205_02 generate_5205(Map<String, Object> params) {
        F5205_02.F5205_02Builder builder = new F5205_02.F5205_02Builder(Calendar.getInstance().get(Calendar.MONTH) - 1, "28");

        if (params.containsKey("observ")) {
            builder.setObservaciones(params.get("observ").toString());
        } else {
            builder.setObservaciones("VmFsaWRhIGNvbiBhbGVydGFzIGRlYmlkbyBhbCA1MjAy");   //Mensaje encriptado obtenido directamente del SigeLite
        }

        F5205_02 model = builder.build();
        helper_5205.fillModel(model);

        return model;
    }

}
